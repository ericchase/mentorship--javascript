'use strict';

//const url = '/home/penguin/cv/files/Jolanta-Lapinskienė-_CV.pdf';
const url = '/pdf/sample.pdf';
const loadingTask = pdfjsLib.getDocument(url);

async function renderCV(canvas) {
    try {
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });
        // Support HiDPI-screens.
        var outputScale = window.devicePixelRatio || 1;

        var context = canvas.getContext('2d');

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + 'px';
        canvas.style.height = Math.floor(viewport.height) + 'px';

        var transform =
            outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        var renderContext = {
            canvasContext: context,
            transform: transform,
            viewport: viewport,
        };

        page.render(renderContext);
    } catch (err) {
        const div = document.createElement('div');
        div.className = 'error';
        div.appendChild(document.createTextNode(err.message));
    }
}
