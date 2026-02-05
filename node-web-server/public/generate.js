
/**
 * Shows an error in the document.
 * 
 * @param {*} err 
 */
function showError(err, statusCode, statusText) {
    const obj = JSON.parse(err);
    const formatted = JSON.stringify(obj, null, 2);

    console.info(obj);

    const errorTextEle = document.getElementById('error-text');
    errorTextEle.textContent = 'Error During Generation: ' + statusCode + ': ' + statusText;
    errorTextEle.style.visibility = 'visible';

    document.getElementById('json-display').textContent = formatted;
}

/**
 * Calls the back-end to write the swagger file and generate typescript.
 * 
 * @param {*} data The JSON string of the swagger API.
 */
async function writeSwaggerFile(data) {

  const swaggerFile = document.getElementById('swagger-file-name').value;
  const tsFileName = document.getElementById('ts-file-name').value;

  console.info(swaggerFile, tsFileName);

  payload = {
    'data': data,
    'swaggerFile': swaggerFile,
    'tsFile': tsFileName
  };

  const uri = window.location.origin + '/write-swagger';

  const resp = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
    body: JSON.stringify(payload)
  });

  if (resp.ok) {    
    const blob = await resp.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swagger-ts.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    document.getElementById('success-gen').style.visibility = 'visible';
  }
  else {
    const error = await resp.json();

    showError(error, resp.status, resp.statusText);
  }
}

/**
 * 
 */
async function generate() {
  document.getElementById('success-gen').style.visibility = 'hidden';
  document.getElementById('error-text').style.visibility = 'hidden';

  const uri = window.location.origin + '/generate';

  const resp = await fetch(uri);
  if (resp.ok) {
    resp.json().then(data => {
      const j = JSON.stringify(data, null, 2);

      document.getElementById('json-display').textContent = j;

      writeSwaggerFile(j);

    }).catch(e => console.error(e));
  }
  else {
    const error = await resp.json();

    showError(error, resp.status, resp.statusText);
  }
}