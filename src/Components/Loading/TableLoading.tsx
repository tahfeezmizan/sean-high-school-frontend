import { Skeleton } from 'antd';
import React from 'react';

const TableLoading = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <tbody>
                    {[...Array(10)].map((_, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-4 px-4">
                                <Skeleton.Input active className="w-4" />
                            </td>
                            <td className="py-4 px-4">
                                <Skeleton.Input active className="w-24" />
                            </td>
                            <td className="py-4 px-4">
                                <Skeleton.Input active className="w-32" />
                            </td>
                            <td className="py-4 px-4">
                                <Skeleton.Input active className="w-8" />
                            </td>
                            <td className="py-4 px-4">
                                <Skeleton.Input active className="w-48" />
                            </td>
                            <td className="py-4 px-4">
                                <Skeleton.Button active className="w-24" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableLoading;
