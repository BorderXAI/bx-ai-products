import React from 'react';
import { Store, Plus, Users, DollarSign, Video, ShoppingBag, UserCheck, Link as LinkIcon } from 'lucide-react';
import { AddShopModal } from './AddShopModal';

interface Shop {
  id: string;
  name: string;
  followers: number;
  totalGMV: number;
  liveGPM: number;
  videoGPM: number;
  unitsSold: number;
  creators: number;
  affiliateGMV: number;
  status: string;
}

export function ShopsTable() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [shops, setShops] = React.useState<Shop[]>([
    {
      id: '1',
      name: 'Fashion Store',
      followers: 250000,
      totalGMV: 892450,
      liveGPM: 450,
      videoGPM: 380,
      unitsSold: 12840,
      creators: 45,
      affiliateGMV: 125000,
      status: 'active'
    },
    {
      id: '2',
      name: 'Beauty Shop',
      followers: 180000,
      totalGMV: 654320,
      liveGPM: 380,
      videoGPM: 420,
      unitsSold: 9850,
      creators: 32,
      affiliateGMV: 98000,
      status: 'active'
    },
    {
      id: '3',
      name: 'Electronics Hub',
      followers: 320000,
      totalGMV: 1250000,
      liveGPM: 580,
      videoGPM: 490,
      unitsSold: 15620,
      creators: 58,
      affiliateGMV: 245000,
      status: 'active'
    }
  ]);

  const handleAddShop = (shopData: any) => {
    setShops(prevShops => [...prevShops, {
      id: (prevShops.length + 1).toString(),
      ...shopData
    }]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">TikTok Shops</h2>
          <p className="text-sm text-gray-500">Manage your TikTok shop performance</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Add Shop
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-gray-600">Shop Name</th>
              <th className="text-right p-3 text-gray-600">Followers</th>
              <th className="text-right p-3 text-gray-600">Total GMV</th>
              <th className="text-right p-3 text-gray-600">LIVE GPM</th>
              <th className="text-right p-3 text-gray-600">Video GPM</th>
              <th className="text-right p-3 text-gray-600">Shop Units Sold</th>
              <th className="text-right p-3 text-gray-600">Ecommerce Creators</th>
              <th className="text-right p-3 text-gray-600">GMV from Affiliates</th>
              <th className="text-right p-3 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {shops.map(shop => (
              <tr key={shop.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Store className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{shop.name}</p>
                      <p className="text-sm text-gray-500">Shop ID: {shop.id}</p>
                    </div>
                  </div>
                </td>
                <td className="text-right p-3">
                  <div className="flex items-center justify-end gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    {(shop.followers / 1000).toFixed(1)}K
                  </div>
                </td>
                <td className="text-right p-3">
                  <div className="flex items-center justify-end gap-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    ${(shop.totalGMV / 1000).toFixed(1)}K
                  </div>
                </td>
                <td className="text-right p-3">${shop.liveGPM}</td>
                <td className="text-right p-3">${shop.videoGPM}</td>
                <td className="text-right p-3">
                  <div className="flex items-center justify-end gap-1">
                    <ShoppingBag className="h-4 w-4 text-gray-400" />
                    {shop.unitsSold.toLocaleString()}
                  </div>
                </td>
                <td className="text-right p-3">
                  <div className="flex items-center justify-end gap-1">
                    <UserCheck className="h-4 w-4 text-gray-400" />
                    {shop.creators}
                  </div>
                </td>
                <td className="text-right p-3">
                  <div className="flex items-center justify-end gap-1">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                    ${(shop.affiliateGMV / 1000).toFixed(1)}K
                  </div>
                </td>
                <td className="text-right p-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {shop.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddShopModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddShop}
      />
    </div>
  );
}