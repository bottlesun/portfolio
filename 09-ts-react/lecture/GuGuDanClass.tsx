import * as React from "react";
import {ChangeEventHandler, Component, FormEvent} from "react";

interface IState {// I 를 붙히는건 개인 취향 I sms interface의 I
    first: number,
    second: number,
    value: string,
    result: string,
}

class GuGuDan extends Component<{}, IState> { // <{},IState> 부분을 연결하여 타입 추론
    state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: '',
    };

    onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                return {
                    result: '정답: ' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: '',
                };
            });
            if (this.input) {
                this.input.focus();
            }

        } else {
            this.setState({
                result: '땡',
                value: '',
            });
            if (this.input) {
                this.input.focus();
            }
        }
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.target.value});
    }

    input: HTMLInputElement | null = null; // 타입을 맞춰야 한다.

    onRefInput = (c: HTMLInputElement) => {
        this.input = c;
    }

    render() {
        return (
            <>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input
                        ref={this.onRefInput}
                        type="number"
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }

}

export default GuGuDan;