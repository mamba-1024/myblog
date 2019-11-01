> 前段时间做一个基于 koa 的 Excel 文件上传和下载功能，刚开始也是一脸懵逼，各种的Google......现在回想起来还是简单的写个总结，好记性不如烂笔头

技术栈准备：

1. 使用了一个基于 node 的处理 Excel 文件的三方库 [node-xlsx](https://www.npmjs.com/package/node-xlsx)
2. 文件处理过程涉及到文件名称的格式编码，使用到一个编码库 [urlencode](https://www.npmjs.com/package/urlencode)

### 文件导出

1. 生成文件名称

通常文件名称可能会依赖数据库的数据，比如：`${name}-${version}.xlsx`

最终我们需要是 eg：`手机号码-20191010.xlsx`

使用 urlencode 编码生成文件名称 

简单粗暴直接上代码
```
const fileName = urlencode(`${projectName}-${versionId}.${fileType}`, 'utf-8');
```

2. 生成表格数据

一般我们从数据库查询到的数据都是 Array 格式，所以可以直接处理一下转为 xlsx 的格式

组装我们需要的数据，生成表格的表头，最后返回一个 buffer，这样在浏览器中就直接自动下载。

```
  const dataArray = [......];
  /**
   * 组装Excel数据
   */
  let xlsxArr = [] // 表格数据
  let first = ['key'] // 表格表头
  dataArray.forEach(ele => {
    let arrRow = []
    arrRow.push(ele.contentKey)
    ele.contentValues.forEach(item => {
      arrRow.push(item.content)
      if(!first.includes(item.language)){
        first.push(item.language)
      }
    })
    xlsxArr.push(arrRow)
  })
  xlsxArr.unshift(first)

  try {
    const options = { '!cols': first.map(() => ({ wch: 50 })) }; // 设置表格列宽

    var buffer = xlsx.build([{name: "mySheetName", data: xlsxArr}], options); // returns a buffer

    // 设置响应的类型为 stream 格式
    ctx.type = 'application/octet-stream'

    // 设置 Content-Disposition
    ctx.set("Content-Disposition", "attachment; filename* = UTF-8''"+fileName)

    ctx.body = buffer;
  } catch (e) {
    console.log(e)
    throw new Error('生成excel文件失败！')
  }

```

3. 生成一个 json 格式的文件

将从数据库查询的数据进行 json 化处理

```
  let json = {};
  // 将数据json化处理
  dataArray.forEach(ele => {
    ele.contentValues.forEach(item => {
      if (json.hasOwnProperty(item.language)) {
        json[item.language][ele.contentKey] = item.content;
      } else {
        json[item.language] = {};
        json[item.language][ele.contentKey] = item.content;
      }
    });
  });

  ctx.type = 'application/octet-stream'

  ctx.set("Content-Disposition", "attachment; filename* = UTF-8''"+fileName)

  ctx.body = JSON.stringify(json, null, 2)
```

### 文件上传

解析.json 或者 .xlsx 文件的数据
```
  /**
   * 接收 .json 或者 .excel 格式的文件
   */
  const fileType = ctx.request.body.filename.indexOf('.json')
  // 获取上传的文件夹地址
  const uploadDir = os.tmpdir()

  try {
    // 将文件中数据接口解析成数据库中需要的格式
    let dataList

    if(fileType === -1) { // .excel文件
      // 使用 xlsx 库解析文件
      const obj = xlsx.parse(uploadDir + '/' + ctx.request.body.filename);

      const excelData = obj[0].data
      const excelHeader = excelData[0]
      const fileData = excelData.splice(1)
      dataList = _.reduce(fileData, (result, value) => {
        if(Array.isArray(value)) {
          excelHeader.forEach((item, key) => {
            if(key === 0) {
              result[value[0]] = result[value[0]] ? result[value[0]] : []
            } else if(key !==0) {
              if(value[key]) {
                result[value[0]].push({ content: value[key], language: item})
              }
            }
          })
          return result
        } else {
          throw new Error('格式不符合要求！')
        }
      }, {})

    } else { // .json文件
      let resourceJson = JSON.parse(fs.readFileSync(uploadDir + '/' + ctx.request.body.filename, {encoding: 'utf-8'}))
      // let resourceJson = require(uploadDir + '/' + ctx.request.body.filename)

      dataList = _.reduce(resourceJson, (result, value, key) => {
        if(typeof value === 'object') {
          Object.keys(value).forEach(ret => {
            result[ret] = result[ret] ? result[ret] : []
            result[ret].push({ content: value[ret], language: key })
          })
          return result
        } else {
          throw new Error('格式不符合要求！')
        }
      },{})
    }

    // 接下来就是 将数据分类成插入和更新两种操作
    ....
    dataList 数据库的 insert 和 update
    ....


  }catch (e) {
    ctx.body = '格式不符合要求！'
    throw new Error('格式不符合要求！')
  }


```


至此，文件的上传和导出已经完成，代码直接可以使用😁

欢迎优化
