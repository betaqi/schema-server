module.exports = (app) => ({
    // 判断是否是本地环境
    isLocal: () => process.env.NODE_ENV === 'local',

    // 判断是否是生产环境
    isProd: () => process.env.NODE_ENV === 'prod',

    // 判断是否是测试环境
    isBeta: () => process.env.NODE_ENV === 'beta',
    // 获取当前环境
    getEnv: () => process.env.NODE_ENV || 'local',
    // 获取所有环境变量
    getAllEnv: () => process.env,
})