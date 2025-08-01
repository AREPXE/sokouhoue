export interface UserData {
  id?: string;
  full_name: string;
  photo_url: string;
  price: number;
  record_number: number;
  custom_text: string;
  photo_x: number;
  photo_y: number;
  photo_size: number;
  name_x: number;
  name_y: number;
  name_size: number;
  price_x: number;
  price_y: number;
  price_size: number;
  record_number_x: number;
  record_number_y: number;
  record_number_size: number;
  custom_text_x: number;
  custom_text_y: number;
  custom_text_size: number;
  created_at?: string;
}

export interface ElementPosition {
  x: number;
  y: number;
  size: number;
}

export interface CompositionElements {
  photo: ElementPosition;
  name: ElementPosition;
  price: ElementPosition;
  recordNumber: ElementPosition;
  customText: ElementPosition;
}

export interface CompositionCanvasProps {
  fullName: string;
  price: number;
  recordNumber: number;
  customText: string;
  photoUrl: string;
  elements: CompositionElements;
  className?: string;
  displaySize?: number;
}
