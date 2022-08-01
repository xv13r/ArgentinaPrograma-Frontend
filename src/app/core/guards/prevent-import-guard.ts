export function PreventImportGuard( moduleParent:any, moduleName:string ){
    if(moduleParent)
        throw new TypeError(`${moduleName} has already been loaded. Import in the AppModule only.`);
}