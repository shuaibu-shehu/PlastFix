import {PlasticItem, PlasticLoggerDialogProps, PlasticType} from '@/lib/types';

// PlasticLoggerDialog.tsx
import React, {useState} from 'react';
import {X, Trash2} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogPortal,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const PlasticLoggerDialog: React.FC<PlasticLoggerDialogProps> = ({
  trigger,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setItems] = useState<PlasticItem[]>([
    {
      name: '',
      quantity: '1',
      weight: '0.1',
      type: 'single-use',
    },
  ]);

  const plasticTypes: PlasticType[] = [
    {id: 'single-use', label: 'Single-Use', color: 'text-orange-500'},
    {id: 'recyclable', label: 'Recyclable', color: 'text-green-500'},
    {id: 'non-recyclable', label: 'Non-Recyclable', color: 'text-red-500'},
  ];

  const handleAddItem = (): void => {
    setItems([
      ...items,
      {
        name: '',
        quantity: '1',
        weight: '0.1',
        type: 'single-use',
      },
    ]);
  };

  const handleRemoveItem = (index: number): void => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof PlasticItem,
    value: string
  ): void => {
    const newItems = [...items];

    newItems[index][field] = value as any; // Type assertion needed due to union type
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit?.(items);
    setItems([{name: '', quantity: '1', weight: '0.1', type: 'single-use'}]);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
          <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold'>Log Plastic Usage</h2>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400 hover:text-gray-500'
                type='button'>
                <X className='w-5 h-5' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-3'>
                {items.map((item, index) => (
                  <div key={index} className='flex gap-2 items-center'>
                    <input
                      type='text'
                      placeholder='Item name'
                      className='flex-1 p-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-gray-200'
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, 'name', e.target.value)
                      }
                    />

                    <select
                      value={item.type}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          'type',
                          e.target.value as PlasticItem['type']
                        )
                      }
                      className={`w-40 p-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-gray-200 
                          ${
                            plasticTypes.find((t) => t.id === item.type)?.color
                          }`}>
                      {plasticTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    <input
                      type='number'
                      placeholder='Qty'
                      className='w-20 p-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-gray-200'
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, 'quantity', e.target.value)
                      }
                      min='1'
                    />

                    <div className='relative'>
                      <input
                        type='number'
                        placeholder='Weight'
                        className='w-24 p-2 pr-8 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-gray-200'
                        value={item.weight}
                        onChange={(e) =>
                          handleItemChange(index, 'weight', e.target.value)
                        }
                        step='0.1'
                        min='0'
                      />
                      <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm'>
                        kg
                      </span>
                    </div>

                    <button
                      type='button'
                      onClick={() => handleRemoveItem(index)}
                      className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                      disabled={items.length === 1}>
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div>

              <div className='flex gap-4 pt-4'>
                <button
                  type='button'
                  onClick={handleAddItem}
                  className='px-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium'>
                  + Add Another Item
                </button>

                <button
                  type='submit'
                  className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto'>
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default PlasticLoggerDialog;
