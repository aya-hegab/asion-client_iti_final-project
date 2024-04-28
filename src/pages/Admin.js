import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

function AdminPanel() {
    const [adminStatistics, setAdminStatistics] = useState({});
    const [orderStatistics, setOrderStatistics] = useState({});
    const [planStatistics, setPlanStatistics] = useState({});
    const [productStatistics, setProductStatistics] = useState({});

    useEffect(() => {
        fetchAdminStatistics();
        fetchOrderStatistics();
        fetchPlanStatistics();
        fetchProductStatistics();
    }, []);

    const fetchAdminStatistics = () => {
        fetch('http://localhost:8000/api/admin/statistics/')
            .then(response => response.json())
            .then(data => setAdminStatistics(data))
            .catch(error => console.error('Error fetching admin statistics:', error));
    };

    const fetchOrderStatistics = () => {
        fetch('http://localhost:8000/order-statistics/')
            .then(response => response.json())
            .then(data => setOrderStatistics(data))
            .catch(error => console.error('Error fetching order statistics:', error));
    };

    const fetchPlanStatistics = () => {
        fetch('http://localhost:8000/api/admin/plan-statistics/')
            .then(response => response.json())
            .then(data => setPlanStatistics(data))
            .catch(error => console.error('Error fetching plan statistics:', error));
    };

    const fetchProductStatistics = () => {
        fetch('http://localhost:8000/best-selling-products/')
            .then(response => response.json())
            .then(data => setProductStatistics(data))
            .catch(error => console.error('Error fetching product statistics:', error));
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px' }}>
                <div style={{ marginLeft: '50px', marginTop: '10px' }}>
                    {/* <Link
                        to="/UserManagement"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                        }}
                    >
                        User Management
                    </Link>
                    <Link
                        to="/ProductManagement"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                            margin: "10px"
                        }}
                    >
                        Product Management
                    </Link>
                    <Link
                        to="/PlanManagment"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                            margin: "10px"
                        }}
                    >
                        Plan Management
                    </Link>
                    <Link
                        to="/VendorPayment"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                            margin: "10px"
                        }}
                    >
                       Payment History
                    </Link> */}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <div style={{ width: '50%' }}>
                    <h2>Quantity Statistics</h2>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={300}
                        height={200}
                    >
                        <VictoryAxis
                            tickValues={['Orders', 'Products', 'Users']}
                            tickFormat={['Orders', 'Products', 'Users']}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={x => `${x}`}
                        />
                        <VictoryBar
                            data={[
                                { x: 'Orders', y: adminStatistics.orders_count || 0 },
                                { x: 'Products', y: adminStatistics.products_count || 0 },
                                { x: 'Users', y: adminStatistics.users_count || 0 }
                            ]}
                        />
                    </VictoryChart>
                </div>
                <div style={{ width: '50%' }}>
                    <h2>Order Statistics</h2>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={300}
                        height={200}
                    >
                        <VictoryAxis
                            tickValues={['Total Orders', 'Total Revenue', 'Average Value']}
                            tickFormat={tick => (typeof tick === 'number' ? tick.toFixed(0) : tick)}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={tick => (typeof tick === 'number' ? tick.toFixed(0) : tick)}
                        />
                        <VictoryBar
                            data={[
                                { x: 'Total Orders', y: orderStatistics.total_orders || 0 },
                                { x: 'Total Revenue', y: parseFloat(orderStatistics.total_revenue) || 0 },
                                { x: 'Average Value', y: parseFloat(orderStatistics.average_order_value) || 0 }
                            ]}
                        />
                    </VictoryChart>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <div style={{ width: '50%' }}>
                <h2>Plan Statistics</h2>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={600} // Increased width
                        height={400} // Increased height
                    >
                        <VictoryAxis
                            tickValues={['NumberOfPlans', 'TotalRevenue', 'MostPurchasedPlan']}
                            tickFormat={['NumberOfPlans', 'TotalRevenue', 'MostPurchasedPlan']} // Display plan name
                            style={{ tickLabels: { fontSize: 12 } }} // Larger font size
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={tick => `${tick}`} // Numbers on y-axis
                            style={{ tickLabels: { fontSize: 12 } }} // Larger font size
                        />
                        <VictoryBar
                            data={[
                                { x: 'NumberOfPlans', y: planStatistics.total_plans || 0 },
                                { x: 'TotalRevenue', y: parseFloat(planStatistics.total_revenue) || 0 },
                                { x: 'MostPurchasedPlan', y: planStatistics.most_purchased_plan_count || 0, label: `${planStatistics.most_purchased_plan} (${planStatistics.most_purchased_plan_count})` } // Bar for most purchased plan
                            ]}
                            labels={({ datum }) => datum.label} // Show plan name and count as labels
                            labelComponent={<VictoryLabel dy={-15} />} // Adjust label position
                        />
                    </VictoryChart>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
    {productStatistics.best_selling_products && (
        <div style={{ width: '50%' }}>
            <h2>Bestseller Product </h2>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                width={600}
                height={400}
            >
                <VictoryAxis
                    tickValues={productStatistics.best_selling_products.map(product => product.product_name)}
                    tickFormat={tick => tick}
                    style={{ tickLabels: { fontSize: 12 } }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={tick => `${tick}`}
                    style={{ tickLabels: { fontSize: 12 } }}
                />
                <VictoryBar
                    data={productStatistics.best_selling_products}
                    x="product_name"
                    y="total_quantity_sold"
                    labels={({ datum }) => datum.total_quantity_sold}
                    labelComponent={<VictoryLabel dy={-15} />}
                    barWidth={40}
                />
            </VictoryChart>
        </div>
    )}
</div>

        </>
    );
}

export default AdminPanel;
