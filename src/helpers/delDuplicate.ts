export const delDuplicate = (obj,key) => {
    let setObj = new Set();
    let filterObj = obj.filter((e)=>{
        if(e[`${key}`] != undefined && e[`${key}`] != ''){
            let duplicated = setObj.has(e[`${key}`]);
            setObj.add(e[`${key}`]);
            return !duplicated
        }
    })
    let result:[string]=[""]
    filterObj.forEach(e => {
        result.push(e[`${key}`])
    });
    result.shift()
    return result
}
