import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any) => {
    let options: any;
    if (req) {
        let params = new HttpParams();

        params = params.append("page", req.page);
        params = params.append("size", req.size);
        if (req.sort) {
            params = params.append("sort", req.sort);
        }
        options = params;
    }
    return options
}