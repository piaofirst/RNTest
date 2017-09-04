export type RNTesterExample = {
    key: String,
    module: object,
}

const ComponentExamples: Array<RNTesterExample> = [
    {
        key: 'ActivityIndicatorExample',
        module: require('./ActivityIndicatorExample'),
    },
    {
        key: 'ButtonExample',
        module: require('./ButtonExample'),
    },
    {
        key: 'FlatListExample',
        module: require('./FlatListExample'),
    },
    {
        key: 'ImageExample',
        module: require('./ImageExample'),
    },
    {
        key: 'ListViewExample',
        module: require('./ListViewExample'),
    },
    {
        key: 'ListViewGridLayoutExample',
        module: require('./ListViewGridLayoutExample'),
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