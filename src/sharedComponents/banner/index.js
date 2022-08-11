import React, { useCallback, memo, useRef, useState, useEffect, createRef } from "react";
import {
    FlatList,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { StyledImageBackground, StyledCardCover } from './style';
const { width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
    pagination: {
        position: "absolute",
        bottom: 8,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    paginationDotActive: { backgroundColor: "lightblue" },
    paginationDotInactive: { backgroundColor: "gray" },

    carousel: { flex: 1, width: windowWidth, height: 150, flexDirection: 'row' },
});


export default Banner = (props) => {
    const [index, setIndex] = useState(-1);
    const indexRef = useRef(index);
    const flatList = createRef();
    const [slideData, setSlideData] = useState(props.data)
    indexRef.current = index;

    const Slide = memo(function Slide({ data }) {
        return (
            <TouchableOpacity onPress={data.fnc} onLongPress={data.longFnc}>
                <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: data.image }}>
                    <StyledCardCover source={{ uri: data.image }} resizeMode='contain' />
                </StyledImageBackground>
            </TouchableOpacity>
        );
    });

    const slideList = slideData.map((x, i) => {
        return {
            id: i,
            image: x.img,
            fnc: x.onPress,
            longFnc: x.onLongPress
        };
    });

    const Pagination = ({ index }) => {
        return (
            <View style={styles.pagination} pointerEvents="none">
                {slideList.map((_, i) => {
                    return (
                        <View
                            key={i}
                            style={[
                                styles.paginationDot,
                                index === i
                                    ? styles.paginationDotActive
                                    : styles.paginationDotInactive,
                            ]}
                        />
                    );
                })}
            </View>
        );
    }

    useEffect(() => {
        setIndex(0)
    }, [])

    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        const distance = Math.abs(roundIndex - index);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);

    useEffect(() => {
        if (slideData.length > 1) {
            const time = setInterval(goToNextPage, 5000)
            return () => clearInterval(time)
        }
    }, [index, slideData])

    const goToNextPage = () => {
        const varData = index === slideData.length - 1 ? 0 : index + 1;
        if (flatList.current && index !== undefined && index >= 0) {
            flatList.current?.scrollToIndex({
                index: varData > slideData.length - 1 ? -1 : varData,
                animated: true,
            });
        }
        setIndex(index > slideData.length - 1 ? 0 : index + 1)
    };

    const flatListOptimizationProps = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 1,
        keyExtractor: useCallback(s => String(s.id), []),
        getItemLayout: useCallback(
            (_, index) => ({
                index,
                length: windowWidth,
                offset: index * (windowWidth),
            }),
            []
        ),
    };

    const renderItem = useCallback(function renderItem({ item }) {
        return <Slide data={item} />;
    }, []);

    return (
        <View>
            <FlatList
                data={slideList}
                style={styles.carousel}
                renderItem={renderItem}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={onScroll}
                flatListRef={React.createRef()}
                ref={flatList}
                {...flatListOptimizationProps}
            />
            {slideData.length > 1 ? <Pagination index={index}></Pagination> : null}
        </View>
    );
}