function soph_strings(string) {
    space = ' '; 
    n_arr=[] 
    n_str=string
    n_arr[0]=string
    for(let i=0;i<string.length;i++) {
        n_str=space+n_str; 
        n_arr[i+1]=n_str;
    }  
    for(let k=0;k<string.length;k++){
        let n_var=n_arr[(n_arr.length-1)-k].slice(k);
        n_arr.push(n_var);
    
    } 
    n_arr.push(string)
    n_arr.forEach(element => {
        console.log(element)
    });
} 


soph_strings('hello');
