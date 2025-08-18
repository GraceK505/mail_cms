export default function generateDynamicCSS(stylesObj: any): string {
    let styles = '';
  
    for (const selector in stylesObj) {
      if (stylesObj.hasOwnProperty(selector)) {
        styles += `${selector} {`;
        for (const prop in stylesObj[selector]) {
          if (stylesObj[selector].hasOwnProperty(prop)) {
            styles += `${prop}: ${stylesObj[selector][prop]};`;
          }
        }
        styles += `} `;
      }
    }
  
    return styles;
  }
  