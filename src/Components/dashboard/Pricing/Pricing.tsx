/* eslint-disable react/no-unescaped-entities */
"use client"
import { useGetAllPlanQuery, useUpdatePlanMutation } from "@/Redux/apis/plan.ts/planApi";
import { Check, Edit, X, Plus, Minus } from "lucide-react";
import { TPlan } from "../../../../Type";
import { Button } from "@/ui/Button";
import NormalLoading from "@/Components/Loading/NormalLoading";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardPricing() {
    const { data, isLoading, error, refetch } = useGetAllPlanQuery({});
    const [updatePlan] = useUpdatePlanMutation();
    const [editingPlan, setEditingPlan] = useState<TPlan | null>(null);
    const [editedPrice, setEditedPrice] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedIncluded, setEditedIncluded] = useState<string[]>([]);
    const [newIncludedItem, setNewIncludedItem] = useState("");

    const handleEditPlan = (plan: TPlan) => {
        setEditingPlan(plan);
        setEditedPrice(plan.price.toString());
        setEditedDescription(plan.description);
        setEditedIncluded([...plan.included]);
    };

    const handleCancelEdit = () => {
        setEditingPlan(null);
        setEditedPrice("");
        setEditedDescription("");
        setEditedIncluded([]);
    };

    const handleSavePlan = async () => {
        if (!editingPlan || !editedPrice) return;
        const body = {
            description: editedDescription,
            price: parseFloat(editedPrice),
            included: editedIncluded
        }
        console.log(data, ';ddddddd');
        try {
            const response = await updatePlan(
                { id: editingPlan.id, body }
            ).unwrap();


            toast.success(response.message || "Plan updated successfully");
            refetch(); // Refresh the data
            setEditingPlan(null);
        } catch (error) {
            toast.error("Failed to update plan");
            console.error(error);
        }
    };

    const handleAddIncludedItem = () => {
        if (newIncludedItem.trim()) {
            setEditedIncluded([...editedIncluded, newIncludedItem]);
            setNewIncludedItem("");
        }
    };

    const handleRemoveIncludedItem = (index: number) => {
        const updatedItems = [...editedIncluded];
        updatedItems.splice(index, 1);
        setEditedIncluded(updatedItems);
    };

    if (isLoading) {
        return <NormalLoading />;
    }

    if (error) {
        return (
            <section className="max-w-5xl mx-auto py-8">
                <div className="text-center text-red-500">Error loading plans</div>
            </section>
        );
    }

    return (
        <section className="py-12">
            <div className={`max-w-5xl mx-auto  ${editingPlan ? 'px-2' : "px-4 md:px-8"}`}>
                <div className="grid md:grid-cols-2 gap-8">
                    {data?.data?.map((plan: TPlan) => (
                        <div
                            key={plan.id}
                            className={`${plan.planName === "Monthly Plan" ? "bg-amber-50" : "bg-[#E5F2FC]"} rounded-md p-4 md:p-8 relative`}
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {plan.planName}
                            </h3>
                            {
                                editingPlan?.id === plan.id ? (

                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        className="w-full p-2 border rounded mb-6 text-[18px] font-[500] text-gray-600"
                                        rows={3}
                                    />
                                ) : (
                                    <p className="text-[18px] font-[500] text-gray-600 mb-6">
                                        {plan.description}
                                    </p>
                                )
                            }

                            <div className="pb-4 border-gray-300 border-b">
                                {editingPlan?.id === plan.id ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={editedPrice}
                                            onChange={(e) => setEditedPrice(e.target.value)}
                                            className="w-24 p-2 border rounded"
                                            min="0"
                                            step="0.01"
                                        />
                                        <span className="text-gray-600">
                                            /per {plan.planName === "Monthly Plan" ? "month" : "week"}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-4xl font-bold text-gray-700">${plan.price}</span>
                                        <span className="text-gray-600 ml-2">
                                            /per {plan.planName === "Monthly Plan" ? "month" : "week"}
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col justify-between">
                                <div className="pt-4">
                                    <h4 className="text-gray-600 text-[18px] font-[500] mb-4">
                                        What's included
                                    </h4>

                                    {editingPlan?.id === plan.id ? (
                                        <div className="space-y-3">
                                            {editedIncluded.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-start">
                                                        <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                                                        <span className="text-[18px] font-[500] text-gray-600">
                                                            {item}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveIncludedItem(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="flex gap-1 md:gap-2 mt-4 ">
                                                <input
                                                    type="text"
                                                    value={newIncludedItem}
                                                    onChange={(e) => setNewIncludedItem(e.target.value)}
                                                    placeholder="Add new feature"
                                                    className="px-2 py-1 border rounded flex-grow min-w-[0]"
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddIncludedItem()}
                                                />
                                                <button
                                                    onClick={handleAddIncludedItem}
                                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex-shrink-0"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <ul className="space-y-3">
                                            {plan.included.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                                                    <span className="text-[18px] font-[500] text-gray-600">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2.5 justify-end text-[#5C5C5C] mt-4">
                                {editingPlan?.id === plan.id ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={handleCancelEdit}
                                            className="cursor-pointer text-red-500 border-red-500 hover:text-white hover:bg-red-500"
                                        >
                                            <X className="mr-1" /> Cancel
                                        </Button>
                                        <Button onClick={handleSavePlan} className="cursor-pointer border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500">
                                            <Check className="mr-1" /> Save
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => handleEditPlan(plan)}>
                                        <Edit className="mr-1" /> Edit Plan
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}