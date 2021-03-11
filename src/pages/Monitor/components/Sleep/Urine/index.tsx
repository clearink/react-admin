import React, { useRef, useState, useEffect, memo } from "react";
import { Card, Col, Row, Space, Spin } from "antd";
import styles from "./style.module.scss";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import TimeSelect from "../components/TimeSelect";
import * as echarts from "echarts";
import LineChartOptions from "./lineChart";

function Urine() {
    const chartsRef = useRef(null);

    useEffect(() => {
        let myChart = echarts.init(chartsRef.current!);
        myChart.setOption(LineChartOptions);
    }, [])

    return (
        <main className={styles.main}>
            <Spin spinning={false}>
                <div className={styles.page_wrap}>
                    <Card
                        className={styles.history_list}
                        size={"small"}
                        title={<div className={styles.card_header}>历史测量记录</div>}>
                        <div className={styles.card_history_containar}>
                            <TimeSelect
                                className='w-1/2'
                                options={Array.from({ length: 10 }, (_, i) => {
                                    return { label: i, value: i }
                                })}
                            />
                            <TimeSelect
                                className='w-1/2'
                                options={Array.from({ length: 10 }, (_, i) => {
                                    return { label: i, value: i }
                                })}
                            />
                        </div>
                    </Card>
                    <Card
                        className={styles.test_time}
                        size={"small"}
                        title={<div className={styles.card_header}>检测时间：2021年03月03日 星期三</div>}>
                        <div className={styles.test_time_content}>
                            {new Array(11).fill(null).map(_ => (
                                <div className={styles.test_time_content_item}>
                                    <Space direction="vertical">
                                        <div className={styles.test_time_content_item_icon}></div>
                                        <div>111</div>
                                        <div>222</div>
                                    </Space>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card
                        className={styles.test_about}
                        size={"small"}>
                        <BulbOutlined className={styles.icon} />
						关于尿比重
                        <br /><br />
                        <BulbOutlined className={styles.icon} />
						关于尿胆原
                    </Card>
                </div>
                <Card
                    className={styles.blood_sugar_trends}
                    size={"small"}
                    title={<div className={styles.card_header}>尿检趋势</div>}
                >
                    <div className={styles.blood_sugar_trends_content} id="main" ref={chartsRef}></div>
                </Card>
            </Spin>
        </main>
    )
}

export default memo(Urine);