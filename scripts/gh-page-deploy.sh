git checkout --orphan gh-pages 
npm run build

# (for react: replace dist with build)
git --work-tree build add --all
git --work-tree build commit -m 'Deploy'
git push origin HEAD:gh-pages --force
rm -r build
git checkout -f master
git branch -D gh-pages