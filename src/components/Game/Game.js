import React, {
    Component
} from "react";
import Cards from "../Cards";
import Click from "../Click";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";
import data from "../../data.json";

class Game extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount() {
        this.setState({
            data: this.shuffle(this.state.data)
        });
    }

    handleCorrectGuess = newData => {
        const {
            topScore,
            score
        } = this.state;
        const newScore = score + 1;
        const newTopScore = (newScore > topScore) ? newScore : topScore;
        this.setState({
            data: this.shuffle(newData),
            score: newScore,
            topScore: newTopScore
        });
    };

    handleIncorrectGuess = data => {
        this.setState({
            data: this.reset(data),
            score: 0
        });
    };

    reset = data => {
        const reset = data.map(item => ({
            ...item,
            clicked: false
        }));
        return this.shuffle(reset);
    };

    shuffle = data => {
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
        return data;
    };

    handleItemClick = id => {
        let guessedCorrectly = false;
        const newData = this.state.data.map(item => {
            const newItem = {
                ...item
            };
            if (newItem.id === id) {
                if (!newItem.clicked) {
                    newItem.clicked = true;
                    guessedCorrectly = true;
                }
            }
            return newItem;
        });
        guessedCorrectly
            ?
            this.handleCorrectGuess(newData) :
            this.handleIncorrectGuess(newData);
    };

    render() {
        return (
        <div>
            <Navbar score={this.state.score} topScore={this.state.topScore}/>
            <Header />
            <Cards>
                {this.state.data.map(item => (
                    <Click 
                        key={item.id}
                        id={item.id}
                        shake={!this.state.score && this.state.topScore}
                        handleClick={this.handleItemClick}
                        image={item.image}
                    />
                    ))}
            </Cards>
            <Footer />
        </div>
        );
    }
}

export default Game;