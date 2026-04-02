export interface Deal {


  deal_id: string;

  created_date: string;
  
  closed_date?: string;
  
  
  stage: string;
  
  deal_value: number;
  
  region: string;
  
  source: string;
}