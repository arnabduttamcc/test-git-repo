export interface ApiResponse {
    UserValid: UserValidApiRes;
    ds: ApiDataResponse | null;
    noOfRecord: number;
    msg: string;
    othMsg?: string;
    objStr?: string;
    extra_string?: string;
}
export interface ApiDataResponse {
    Table?: any;
    Table1?: any;
    Table2?: any;
    Table3?: any;
    Table4?: any;
    Table5?: any;
    Table6?: any;
    Table7?: any;
    Table8?: any;
    Table9?: any;
    Table10?: any;
    Table11?: any;
    Table12?: any;
    Table13?: any;
    Table14?: any;
}
export interface UserValidApiRes {
    ValidUserYN: "Y" | "N";
}
