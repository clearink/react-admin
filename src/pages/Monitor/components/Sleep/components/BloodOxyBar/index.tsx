import React, { useRef } from "react";
import styles from "./style.module.scss";

export interface BloodOxyBarProps {
    title: string;
    value: string;
}
// 血氧组件
function BloodOxyBar(props: BloodOxyBarProps) {
    let { title, value } = props;
    let chartDataList = useRef([
        {
            text: "最大",
            height: "80px",
            bgColor:"rgba(141, 96, 238, 1)"
        },
        {
            text: "平均",
            height: "60px",
            bgColor:"rgba(218, 145, 242, 1)"
        },
        {
            text: "最小",
            height: "40px",
            bgColor:"rgba(173, 121, 244, 1)"
        },
    ])
    return (
        <main className={styles.main}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <ul className={styles.chartData}>
                {chartDataList.current.map((item, index) => (
                    <li className={styles.chartData_item} key={index}>
                        <p>{item.text}</p>
                        <div className={styles.chartData_item_img} style={{height:item.height,backgroundColor:item.bgColor}}>--</div>
                    </li>
                ))}

            </ul>
            <p className={styles.describe}>{value}</p>
        </main>
    )
}

export default BloodOxyBar;