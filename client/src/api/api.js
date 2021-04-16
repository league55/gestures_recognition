exports.appendLine = (raw) => {
  fetch('http://localhost:3300/raw', {
    method: "POST",
    body: JSON.stringify(raw),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(r => r.text().then(r => console.log(r)));
}

exports.appendLines = (raws) => {
  fetch('http://localhost:3300/raws', {
    method: "POST",
    body: JSON.stringify(raws),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(r => r.text().then(r => console.log(r)));
}

exports.loadData = async () => {
  return fetch('http://localhost:3300/data').then(r => r.text());
}
