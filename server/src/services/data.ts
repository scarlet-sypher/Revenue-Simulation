import { loadDeals } from "../utils/csv.ts";
import type { Deal } from "../types/deal.ts";
import { getMonth } from "../utils/date.ts";

export const getAllDeals = async () : Promise <Deal[]>  => {

  return await loadDeals();

};

export const splitDeals = ( deals: Deal[] ) => {

  const q1: Deal[] = []; // jan - march
  const q2: Deal[] = []; // april - june
  const q3: Deal[] = []; // july to sept



  for (const d of deals) {

    if (d.closed_date) {

      const m = getMonth(d.closed_date);

      if (!m) continue;

      if (m >= 1 && m <= 3) q1.push(d); // Q1


      else if (m >= 4 && m <= 6) q2.push(d); // Q2

      else if (m >= 7) q1.push(d);


    } 
    
    else {

      const m = getMonth(d.created_date);

      if (!m) continue;

      if (m >= 7 && m <= 9) q3.push(d); //Q3 (dont have closing date)
    }


  }

  return { q1, q2, q3 };  // returns data for all 3 quarters
};