// native
import React, { Component } from 'react';
import { TouchableOpacity, Animated, Easing, View, StyleSheet } from 'react-native';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// This is the add button that appears in the middle along with
// other buttons and their animations
class MicButton extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.topLeftValue = new Animated.Value(0);
        this.topCenterValue = new Animated.Value(0);
        this.topRightValue = new Animated.Value(0);
        this.state = {
            pressed: false,
        };
    }

    handleButtonPress = () => {
        let { pressed } = this.state;
        if (pressed) {
            this.animateReverse(0);
        }
        else {
            this.animate(1);
        }
        this.setState({ pressed: !pressed });
    }

    animate = (toValue) => {
        Animated.stagger(Easing.delay, [
            Animated.parallel([
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue,
                        duration: Easing.animateTime,
                        easing: Easing.exp,
                    }
                ),
                Animated.timing(
                    this.topLeftValue,
                    {
                        toValue,
                        duration: Easing.animateTime,
                        easing: Easing.easingType,
                    }
                ),
            ]),
            Animated.timing(
                this.topCenterValue,
                {
                    toValue,
                    duration: Easing.animateTime,
                    easing: Easing.easingType,
                }
            ),
            Animated.timing(
                this.topRightValue,
                {
                    toValue,
                    duration: Easing.animateTime,
                    easing: Easing.easingType,
                }
            ),
        ]).start();
    }

    animateReverse = (toValue) => {
        Animated.stagger(Easing.delay, [
            Animated.timing(
                this.topRightValue,
                {
                    toValue,
                    duration: Easing.animateTime,
                    easing: Easing.easingType,
                }
            ),
            Animated.timing(
                this.topCenterValue,
                {
                    toValue,
                    duration: Easing.animateTime,
                    easing: Easing.easingType,
                }
            ),
            Animated.parallel([
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue,
                        duration: Easing.animateTime,
                        easing: Easing.easingType,
                    }
                ),
                Animated.timing(
                    this.topLeftValue,
                    {
                        toValue,
                        duration: Easing.animateTime,
                        easing: Easing.easingType,
                    }
                ),
            ]),
        ]).start();
    }

    render() {

        let springValue = Animated.add(Animated.add(this.topLeftValue, this.topRightValue), this.topCenterValue);

        return (
            <View>
                <Animated.View
                    style={[
                        style.bigBubble,
                        {
                            transform: [
                                // {
                                //     rotateZ: springValue.interpolate({
                                //         inputRange: [0, 1, 2, 3],
                                //         outputRange: ['-45deg', '-45deg', '0deg', '45deg'],
                                //     }),
                                // },
                                {
                                    scaleY: springValue.interpolate({
                                        inputRange: [0, 0.65, 1, 1.65, 2, 2.65, 3],
                                        outputRange: [1, 1.1, 1, 1.1, 1, 1.1, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >

                    <TouchableOpacity
                        hitSlop={{
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        }}
                        onPress={this.handleButtonPress}
                    >

                        <FAwesomeIcon
                            name="microphone"
                            size={40}
                            color="#FFF"
                        />

                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    bigBubble: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(40, 155, 238)',
        height: 60,
        width: 90,
        borderRadius: 30,
        top: -10,
    },
});

export default MicButton;