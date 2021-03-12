import React, { useRef, useState, useEffect, memo } from "react";
import { Button, Card, Col, Row, Space, Spin } from "antd";
import styles from "./style.module.scss";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import TimeSelect from "../components/TimeSelect";
import EcgRecordBar from "../components/EcgRecordBar";
import classNames from "classnames";

function EcgRecord() {
  // 检测数据
  let EcgRecordBarTestList = useRef([
    {
      title: "平均心率(bpm)",
      value: "10"
    },
    {
      title: "平均心率(bpm)",
      value: "50"
    },
    {
      title: "平均心率(bpm)",
      value: "40"
    },
    {
      title: "平均心率(bpm)",
      value: "60"
    },
    {
      title: "平均心率(bpm)",
      value: "70"
    },
  ])

  let EcgRecordDescribeList = useRef([
    {
      title: "平均心率（bpm）",
      describe: "正常人安静状态下每分钟心跳的次数也叫安静心率，一般为60~100次/分，可因年龄、性别或其他生理因素产生个体差异。"
    },
    {
      title: "QTC间期（ms）",
      describe: "QTC间期是按心率校正的QT间期，是反映心脏去极化和复极作用的指标。QTC间期延长表示心脏复极延迟，反映了心电异常，通常与心律失常敏感性增高密切相关。男性正常范围<430ms，女性<450ms。"
    },
    {
      title: "QRS间期（ms）",
      describe: "QRS是心电图心室除极的时间，是心室活动的表现，故QRS异常常见心室问题。成人QRS间期一般在100ms以内，时限正常不超过120ms，可见于心室肥大、束支传导阻滞、预激综合征、心室内差异传导、高钾血症、急性损伤传导阻滞及药物毒性反应等。"
    },
    {
      title: "PR间期（ms）",
      describe: "PR间期表示激动经心房、房室结、房室束而达心室所需的时间，在心电图上指自P波开始至QRS波群起始部，测量时应选择一个有最大P波和最宽QRS间期的导联。正常平均值小于200ms；婴儿及心搏较速者，PR间期可较短。心率慢时PR间期更长，心率快时相应缩短。儿童PR间期略短，上限值是180ms；老年人PR间期略长，上限值是220ms。"
    },
    {
      title: "QT间期（ms）",
      describe: "QT间期（简称QT）包括心室除极和复极激动时间，代表心室去极化和复极化过程的总时程，为自QRS波的起点至T波的终点所占的时间，测定值随年龄和性别而变化。QT间期与心率快慢有密切关系，正常人心率加速则QT间期缩短，反之则延长。正常值：成年人60~100次心率时，Q-T间期的对应值小于440ms。QT改变在临床心电图诊断上具有重要价值，特别是QT延长对预报恶性心室律失常和心脏性猝死有重要意义。"
    },
  ])

  return (
    <main className={styles.main}>
      <Spin spinning={false}>
        <div className={styles.page_wrap}>
          <Card
            className={styles.history_list}
            size={"small"}
            title={<div className={styles.card_header}>历史记录</div>}>
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
            {EcgRecordBarTestList.current.map((item, index) => (
              <EcgRecordBar title={item.title} value={item.value} key={index} />
            ))}
          </Card>
          <Card
            className={styles.test_about}
            size={"small"}>
            {EcgRecordDescribeList.current.map((item, index) => (
              <div key={index}>
                <BulbOutlined className={styles.icon} />
                {item.title}
                <br />
                <p>
                  {item.describe}
                </p>
              </div>
            ))}
          </Card>
        </div>
        <Card
          className={styles.blood_sugar_trends}
          size={"small"}
          title={<div className={classNames(styles.card_header,styles.blood_sugar_trends_card_header)}>
            <span></span>
            <span>检测报告解读</span>
            <Button type="primary">下载报告</Button>
          </div>}
        >
          <div className={styles.blood_sugar_trends_content}></div>
        </Card>
      </Spin>
    </main>
  )
}

export default memo(EcgRecord)
