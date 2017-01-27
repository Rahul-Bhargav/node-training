console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function html(stringArgs, personName, unsafeString) {
  var cleanPersonName = getCleanString(personName);
  var safeString  = getCleanString(unsafeString);
  return `${stringArgs[0]}${cleanPersonName}${stringArgs[1]}${safeString}${stringArgs[2]}`; 
}

function getCleanString(stringToClean){
  var cleanString = stringToClean.replace(/&/g, '&amp;');
  cleanString = cleanString.replace(/'/g, '&apos;');
  cleanString = cleanString.replace(/"/g, '&quot;');
  cleanString = cleanString.replace(/</g, '&lt;');
  cleanString = cleanString.replace(/>/g, '&gt;');
  
  return cleanString;
}

