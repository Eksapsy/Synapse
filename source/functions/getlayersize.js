function getLayerSize(brain, layer) {
    var keys = Object.keys(brain.globalReferenceNeurons).filter(k => brain.globalReferenceNeurons[k].layer === layer);
    return keys.length;
}
module.exports = getLayerSize;
