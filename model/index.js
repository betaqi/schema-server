const path = require("node:path");
const glob = require("glob");
const lodash = require("lodash");

// 解析model配置
function parseModelConfig() {
  const result = [];

  // 获取所有model.js文件
  const modelFiles = glob.sync(path.join(process.cwd(), '{*,*/*}', 'model.js'));
  const modelMap = new Map();
  modelFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    const category = relativePath.split(path.sep)[1];
    const modelConfig = require(file);
    modelMap.set(category, modelConfig);
  })

  // 获取所有project目录下的schema文件
  const schemaFiles = glob.sync(path.join(process.cwd(), '{*,*/*}', 'project', '*.js'));
  const schemaMap = new Map();
  schemaFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    const category = relativePath.split(path.sep)[1];
    const projectName = path.basename(file, '.js');

    if (!schemaMap.has(category)) {
      schemaMap.set(category, []);
    }
    schemaMap.get(category).push({ name: projectName, file });
  })

  // 为每个分类创建结果
  modelMap.forEach((modelConfig, category) => {
    const projects = {}
    const categorySchemas = schemaMap.get(category);
    categorySchemas.forEach(({ name, file }) => {
        const schemaConfig = require(file);
        projects[name] = deepMerge(modelConfig, schemaConfig)
      }
    )
    result.push({
      model: Object.assign({}, modelConfig, { key: category }),
      projects
    })

  })
  return result
}


function deepMerge(target, source) {
  const output = { ...target }

  for (const sourceKey in source) {
    if (!Object.prototype.hasOwnProperty.call(source, sourceKey)) continue;
    if (output.hasOwnProperty(sourceKey)) {
      const tgtVal = output[sourceKey];
      const srcVal = source[sourceKey];
      // 如果是基本类型的值 则直接覆盖
      if (typeof source[sourceKey] !== 'object' || source[sourceKey] === null) {
        output[sourceKey] = source[sourceKey];
      } else if (Array.isArray(source[sourceKey])) {

        if (!Array.isArray(tgtVal)) return [...srcVal];
        // target 和 source 都是数组
        if (srcVal.every(v => typeof v !== 'object')) {
          // 基本类型数组 直接覆盖
          output[sourceKey] = [...srcVal];
        } else {
          // 对象类型数组 需要根据key进行合并
          const mergedArr = tgtVal.map(tItem => {
            const sItem = srcVal.find(si => si.key === tItem.key);
            return sItem ? deepMerge(tItem, sItem) : tItem;
          });

          const newItems = srcVal.filter(si => !tgtVal.some(ti => ti.key === si.key));
          output[sourceKey] = [...mergedArr, ...newItems];
        }
      } else {
        // 如果是对象 则递归合并
        output[sourceKey] = deepMerge(output[sourceKey], source[sourceKey]);
      }
    } else {
      output[sourceKey] = source[sourceKey];
    }
  }
  return output
}

module.exports = (app) => {
  // const schemaFileList = glob.sync(path.join(process.cwd(), '**', '*.js'), {
  //   ignore: [path.join(process.cwd(), 'index.js')]
  // });

  return parseModelConfig()
}