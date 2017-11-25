# Alex Boffey Personal Site
Built using Gatsby JS

## Get local copy
Clone the repository
```
git clone git@github.com:alexboffey/alexboffey.git

cd alexboffey

npm i
```

## Move public dir contents
Move contents of public to public/alexboffey. This is a workaround for the live pathPrefic being different to the local.
```
cd public

mkdir alexboffey

mv * alexboffey
```

## Running in development
Start local dev server
```
gatsby develop
```

## Deployment
Builds production version of site & pushes to gh-pages branch
```
npm run deploy
```
