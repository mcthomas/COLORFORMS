perl -p -e 's/\n/; /;' $1 > tmp; minified=$(perl -p -se 's/\h+/ /g' tmp); rm tmp;
line=$(grep -n "ruby" $2 | grep -Eo '^[^:]+'); line=$((line+1));
newFile=$(grep -v -w "def setup" $2); rm $2; echo "$newFile" > $2;
sed -i.bak ''"$line"'i\
'"$minified"'\
' $2; rm $2.bak; 
