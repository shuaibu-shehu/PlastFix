export interface PlasticItem {
  name: string;
  quantity: string;
  weight: string;
  type: 'single-use' | 'recyclable' | 'non-recyclable';
}

export interface PlasticType {
  id: PlasticItem['type'];
  label: string;
  color: string;
}

export interface PlasticLoggerDialogProps {
  trigger: React.ReactNode;
  onSubmit?: (items: PlasticItem[]) => void;
}
