perl -p -e 's/\n/; /;' sketch.rb > tmp; minified=$(perl -p -se 's/\s+/ /g' tmp); rm tmp
sed -i.bak '8i\
'"$minified"'\
' index.html; rm index.html.bak
