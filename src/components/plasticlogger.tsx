import React, {useState} from 'react';
import {X, Trash2} from 'lucide-react';
import {PlasticItem, PlasticLoggerDialogProps} from '@/lib/types';

const predefinedItems: PlasticItem[] = [
  {name: 'Water Bottle', type: 'recyclable', weight: '0.025', quantity: '1'},
  {name: 'Bag', type: 'recyclable', weight: '0.005', quantity: '1'},
  {name: 'Cover', type: 'recyclable', weight: '0.005', quantity: '1'},
  {name: 'Condom', type: 'single-use', weight: '0.002', quantity: '1'},

  {name: 'Dustbin', type: 'recyclable', weight: '50.0', quantity: '1'},
  {name: 'Ice Tray', type: 'recyclable', weight: '0.1', quantity: '1'},
  {name: 'Food Tray', type: 'recyclable', weight: '0.25', quantity: '1'},
  {name: 'Bucket', type: 'recyclable', weight: '0.5', quantity: '1'},
  {name: 'Mug', type: 'single-use', weight: '0.084', quantity: '1'},
  {name: 'Planter', type: 'recyclable', weight: '1.0', quantity: '1'},
  {name: 'Cloth Hanger', type: 'recyclable', weight: '0.227', quantity: '1'},
  {name: 'Laundry Basket', type: 'recyclable', weight: '1.62', quantity: '1'},
  {name: 'Broom', type: 'recyclable', weight: '0.4', quantity: '1'},
  {name: 'Toothbrush', type: 'single-use', weight: '0.015', quantity: '1'},
  {name: 'Shampoo Bottle', type: 'recyclable', weight: '0.05', quantity: '1'},

  {name: 'Straw', type: 'single-use', weight: '0.001', quantity: '1'},
  {name: 'Cutlery Set', type: 'single-use', weight: '0.01', quantity: '1'},
  {name: 'Yogurt Cup', type: 'recyclable', weight: '0.02', quantity: '1'},
  {name: 'Detergent Bottle', type: 'recyclable', weight: '0.1', quantity: '1'},
  {
    name: 'Styrofoam Container',
    type: 'non-recyclable',
    weight: '0.01',
    quantity: '1',
  },
  {
    name: 'Blister Packaging',
    type: 'non-recyclable',
    weight: '0.005',
    quantity: '1',
  },
  {name: 'Cling Film', type: 'non-recyclable', weight: '0.002', quantity: '1'},
  {
    name: 'Composite Plastic',
    type: 'non-recyclable',
    weight: '0.015',
    quantity: '1',
  },
  {
    name: 'Polycarbonate Item',
    type: 'non-recyclable',
    weight: '0.03',
    quantity: '1',
  },
];

const PlasticLoggerDialog: React.FC<PlasticLoggerDialogProps> = ({
  trigger,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<PlasticItem[]>([
    {
      name: '',
      quantity: '1',
      weight: '0.1',
      type: 'single-use',
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {name: '', quantity: '1', weight: '0.1', type: 'single-use'},
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof PlasticItem,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index] = {...newItems[index], [field]: value};
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(items);
    setItems([{name: '', quantity: '1', weight: '0.1', type: 'single-use'}]);
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      {isOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold'>Log Plastic Usage</h2>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400 hover:text-gray-500'>
                <X className='w-5 h-5' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-3'>
                {items.map((item, index) => (
                  <div key={index} className='flex gap-2 items-center'>
                    <input
                      type='text'
                      list={`items-${index}`}
                      placeholder='Item name'
                      className='flex-1 p-2 rounded-lg bg-gray-50'
                      value={item.name}
                      onChange={(e) => {
                        const selected = predefinedItems.find(
                          (i) => i.name === e.target.value
                        );
                        if (selected) {
                          const newItems = [...items];
                          newItems[index] = {...selected};
                          setItems(newItems);
                        } else {
                          handleItemChange(index, 'name', e.target.value);
                        }
                      }}
                    />
                    <datalist id={`items-${index}`}>
                      {predefinedItems.map((item) => (
                        <option key={item.name} value={item.name} />
                      ))}
                    </datalist>

                    <select
                      value={item.type}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          'type',
                          e.target.value as PlasticItem['type']
                        )
                      }
                      className='w-40 p-2 rounded-lg bg-gray-50'>
                      <option value='single-use'>Single-Use</option>
                      <option value='recyclable'>Recyclable</option>
                      <option value='non-recyclable'>Non-Recyclable</option>
                    </select>

                    <input
                      type='number'
                      placeholder='Qty'
                      className='w-20 p-2 rounded-lg bg-gray-50'
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
                        className='w-24 p-2 pr-8 rounded-lg bg-gray-50'
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
                      className='p-2 text-gray-400 hover:text-red-500'
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
                  className='text-sm text-green-600 hover:text-green-700 font-medium'>
                  + Add Another Item
                </button>

                <button
                  type='submit'
                  className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto'>
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlasticLoggerDialog;
