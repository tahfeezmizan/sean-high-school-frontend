

import PaymentPricing from "@/Components/PaymentPricing/PaymentPricing";

type tParams = Promise<{ slug: string }>;


export default async function Page({ params }: { params: tParams }) {
    const { slug } = await params;
    return (
        <div>
            <PaymentPricing slug={slug} />
        </div>
    );
}