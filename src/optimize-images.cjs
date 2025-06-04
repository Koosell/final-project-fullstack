import imagemin from 'imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';

(async () => {
    const files = await imagemin(['src/assets/**/*.{jpg,png,jpeg}'], {
        destination: 'src/assets-optimized',
        plugins: [
            mozjpeg({ quality: 75 }),
            pngquant({ quality: [0.6, 0.8] }),
        ],
    });
    console.log('Optimized files:', files.length, 'files processed');
})();
