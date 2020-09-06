function find(source, pattern){
    let starCount = 0;
    for(let i in pattern){
        if(pattern[i] === "*")
            starCount++;
    }
    if(starCount === 0){
        for(let i in pattern.length){
            if(pattern[i] !== source[i] && pattern[i] !== "?")
                return false;
        }
        return;
    }


    let i = 0;
    let lastIndex = 0;
    for(i = 0; pattern[i] !== "*";i++){
        if(pattern[i] !== source[i] && pattern[i] !== "?")
            return false;
    }

    lastIndex = 1;

    for(let p = 0; p < starCount -1; p++){
        i++;
        let subPattern = "";
        while(pattern[i] !== "*"){
            subPattern += pattern[i];
            i++;
        }

        let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"),"g");
        reg.lastIndex = lastIndex;

        if(!reg.exec(source))
            return false;

        lastIndex = reg.lastIndex;
    }

    for(let j = 0; j <= source.length -lastIndex && pattern[pattern.length -j] !== "*"; j++){
        if(pattern[pattern.length - j] !== source[source.length -j]
            && pattern[pattern.length -j] !== "?")
            return false;
    }
    return true;
}

console.log(find("abcabcabxaac", "a*b?*b?x*c"));