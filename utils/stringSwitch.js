
/**
 * 将字符串转换为驼峰命名法
 * @param {string} name - 需要转换的字符串
 * @returns {string} - 转换后的字符串
 *  node-1 -> node1
 *  node-test -> nodeTest
 *  node/test_abc -> node/TestAbc
 */
function toCamelCase(name) {
  return name.replace(/[-_](\w)/g, (_, c) => {
    // 如果是数字，直接返回，不做大小写转换
    if (/\d/.test(c)) return c;
    // 如果是字母，转大写
    return c.toUpperCase();
  });
}

module.exports = {
  toCamelCase,
}
