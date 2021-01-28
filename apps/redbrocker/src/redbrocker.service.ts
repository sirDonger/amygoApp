import { Injectable } from '@nestjs/common';

@Injectable()
export class RedbrockerService {
  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b)=> Number(a) + Number(b));
  }

  public getLocation(data: object){
    const genStringData = JSON.parse(String(data));
    const obj = {
      "coordinates": genStringData
    }
    return obj;
  }
}