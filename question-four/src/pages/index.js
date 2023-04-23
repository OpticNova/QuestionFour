import React from "react";
import { Inter } from "next/font/google";
import _ from "lodash";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [answers, setAnswers] = React.useState([]);

    function handleChange(e) {
        setAnswers([]);

        const files = e.target.files;

        if (files.length === 0) return;

        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(files[0]);
    }

    function handleFileLoad(event) {
        const result = event.target.result;

        let nums = getNumbersRegex(result, /(\d+)/g);
        // let nums = getNumbers(result);

        const groups = _.groupBy(nums, function (i) {
            return i;
        });

        let frequencyModel = [];
        _.forEach(Object.keys(groups), function (item) {
            frequencyModel.push({
                key: +item,
                count: groups[item].length,
            });
        });

        setAnswers(
            _.take(_.orderBy(frequencyModel, "count", "desc"), 5).map((model) => {
                return model.key;
            })
        );
    }

    function getNumbers(input) {
        var lines = input.split("\r\n");
        let nums = [];

        for (var line = 0; line < lines.length; line++) {
            nums.push(+lines[line]);
        }
        return nums;
    }

    function getNumbersRegex(input, regex) {
        return input.match(regex).map((item) => {
            return +item;
        });
    }

    return (
        <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
            <input className=" mb-10" type="file" name="upload" onChange={handleChange}></input>
            <ul>
                {answers.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </main>
    );
}
