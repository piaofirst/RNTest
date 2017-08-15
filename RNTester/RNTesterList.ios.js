export type RNTesterExample = {
    key: string,
    module: Object,
    supportsTVOS: boolean
};
const ComponentExamples: Array<RNTesterExample> = [
    {
        key: 'ActivityIndicatorExample',
        module: require('./ActivityIndicatorExample'),
        supportsTVOS: true,
    },
    {
        key: 'ButtonExample',
        module: require('./ButtonExample'),
        supportsTVOS: true,
    },
];
const APIExamples: Array<RNTesterExample> = [];
const Modules = {};

APIExamples.concat(ComponentExamples).forEach(Example => {
    Modules[Example.key] = Example.module;
});

const RNTesterList = {
    APIExamples,
    ComponentExamples,
    Modules,
};
module.exports = RNTesterList;