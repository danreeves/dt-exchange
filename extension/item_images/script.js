const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function downloadImagesWeapon(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const imageSrcs = await page.evaluate(() => {
    const div = document.querySelectorAll('div.w-40');
    let result = [];

    div.forEach(e => {
      const h3 = e.querySelector('h3');
      const img = e.querySelector('img');
  
      if (h3 && img) {
        const h3Text = h3.textContent.trim();
        const imgSrc = img.getAttribute('src');
        result.push({ title: h3Text, src: imgSrc });
      }
    });
    
    return result
  });

  for (const imgSrc of imageSrcs) {
    const imgName = path.basename(imgSrc.title.trim().replace(/[^a-zA-Z0-9]/g,'_'));
    const uri = path.join(__dirname, imgName + ".png");

    const viewSource = await page.goto('https://darktide.gameslantern.com' + imgSrc.src);
    fs.writeFile(uri, await viewSource.buffer(), err => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier :', err);
      } else {
        console.log(`Téléchargement de ${imgName}...`);
      }
    });
  }

  await browser.close();
}

async function downloadImagesCurious(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const imageSrcs = await page.evaluate(() => {
    const div = document.querySelectorAll('div.gap-4');
    let result = [];

    div.forEach(e => {
      const div = e.querySelector('div');
      const img = e.querySelector('picture > img');
  
      if (div && img) {
        const divText = div.textContent;
        const imgSrc = img.getAttribute('src');
        result.push({ title: divText, src: imgSrc });
      }
    });
    
    return result
  });

  console.log("imageSrcs", imageSrcs)
  for (const imgSrc of imageSrcs) {
    const imgName = path.basename(imgSrc.title.trim().replace(/[^a-zA-Z0-9]/g,'_'));
    const uri = path.join(__dirname, imgName + ".png");

    const viewSource = await page.goto(imgSrc.src);
    fs.writeFile(uri, await viewSource.buffer(), err => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier :', err);
      } else {
        console.log(`Téléchargement de ${imgName}...`);
      }
    });
  }

  await browser.close();
}

const urlWeapons = 'https://darktide.gameslantern.com/weapons?query=';
const urlCurios = 'https://darktide.gameslantern.com/curios';
downloadImagesWeapon(urlWeapons)
  .catch(error => console.error('Erreur :', error));
downloadImagesCurious(urlCurios)
  .catch(error => console.error('Erreur :', error));
