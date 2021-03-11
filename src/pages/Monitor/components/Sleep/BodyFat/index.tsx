import React, { useRef, useState, useEffect, memo } from "react";
import { Card, Col, Row, Space, Spin } from "antd";
import styles from "./style.module.scss";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import TimeSelect from "../components/TimeSelect";
import * as echarts from "echarts";
import LineChartOptions from "./lineCharts";

function BodyFat() {
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
                            <div className={styles.test_time_content_info}>
                                <span>体重76kg</span>
                                <span>体重76kg</span>
                                <span>体重76kg</span>
                            </div>
                            <div className={styles.test_time_content_detail}>
                                {new Array(11).fill(null).map(_ => (
                                    <div className={styles.test_time_content_detail_item}>
                                        <Space direction="vertical">
                                            <div className={styles.test_time_content_detail_item_icon}></div>
                                            <div>111</div>
                                            <div>222</div>
                                        </Space>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                    <Card
                        className={styles.test_about}
                        size={"small"}>
                        <BulbOutlined className={styles.icon} />
						关于身高体重指数
                        <br />
                        <p>
                            身高体重指数（BMI）是体脂指标。它基于身高和体重进行计算，可反映出您体重是否偏轻、正常、偏重或肥胖。它还有助于评估体脂增加可能诱发疾病的风险。
                        </p>
                        <BulbOutlined className={styles.icon} />
						关于体脂率
                        <br />
                        <p>体脂率是指人体中的脂肪重量与总体重（包括肌肉、骨骼、水分等）的比例。</p>
                    </Card>
                </div>
                <Card
                    className={styles.blood_sugar_trends}
                    size={"small"}
                    title={<div className={styles.card_header}>体重趋势</div>}
                >
                    <div className={styles.blood_sugar_trends_content} id="main" ref={chartsRef}></div>
                </Card>
            </Spin>
        </main>
    )
}

export default memo(BodyFat);