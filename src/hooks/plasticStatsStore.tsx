import {create} from 'zustand';

interface PlasticStats {
    recyclableCompareLastMonth: any;
    nonRecyclableCompareLastMonth: any;
    singleUseCompareLastMonth: any;
    totalWeight: number;
    recyclableWeight: number;
    nonRecyclableWeight: number;
    singleUseWeight: number;
    recyclablePercentage: string;
    nonRecyclablePercentage: string;
    singleUsePercentage: string;
    setPlasticStats: (stats: Partial<PlasticStats>) => void;
}

const usePlasticStatsStore = create<PlasticStats>((set) => ({
    recyclableCompareLastMonth: {},
    nonRecyclableCompareLastMonth: {},
    singleUseCompareLastMonth: {},
    totalWeight: 0,
    recyclableWeight: 0,
    nonRecyclableWeight: 0,
    singleUseWeight: 0,
    recyclablePercentage: '0.00',
    nonRecyclablePercentage: '0.00',
    singleUsePercentage: '0.00',
    setPlasticStats: (stats) => set((state) => ({ ...state, ...stats })),
}));

export default usePlasticStatsStore;