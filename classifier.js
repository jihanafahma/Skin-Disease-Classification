var model;
var predResult = document.getElementById("result");
async function initialize() {
    model = await tf.loadLayersModel('model.json');
}
async function predict() {
      console.clear();
      let image = document.getElementById("img")  
      let tensorImg =   tf.browser.fromPixels(image).resizeNearestNeighbor([28, 28]).toFloat().expandDims();
      prediction = await model.predict(tensorImg).data();
      console.log(prediction);
      let maxPredict = Math.max(...prediction);
      console.log(maxPredict);
      if (maxPredict > 0.93) {
            for (var i = 0; i < prediction.length; i++) {
                  if (prediction[i] === maxPredict) {
                  result = i;
                  } 
            }
            if (result === 0) {
                  predResult.innerHTML = "Actinic Keratoses";
            } else if (result === 1) {
                  predResult.innerHTML = "Basal Cell Carcinoma";
            } else if (result === 2) {
                  predResult.innerHTML = "Benign Keratosis-like Lesions";
            } else if (result === 3) {
                  predResult.innerHTML = "Dermatofibroma";
            } else if (result === 4) {
                  predResult.innerHTML = "Melanocytic Nevi";
            } else if (result === 5) {
                  predResult.innerHTML = "Melanoma";
            } else if (result === 6) {
                  predResult.innerHTML = "Vascular Lesions";
            } 
      } else {
                  predResult.innerHTML = "Cannot be Identified";
            }
}
initialize();