export interface AdvantagedClient {
    id: string;
    client: string;
    program: string;
    fees: number;
    auditorSince?: string;
    isSECFiler: boolean;
    companyType?: any;
    fiscalYearEnd: string;
    region: string;
    office: string;
    industrySector: string;
    lcsp?: any;
    lcspYearsInRole?: any;
    ap?: any;
    apYearsInRole?: any;
    rating: string;
    changed: string;
    dateUpdated: string;
    lastModifyBy: string;
    lastModifyDate: string;
}
