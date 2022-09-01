import React, { useContext, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info.card";
import { Spacer } from "../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animations";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { Search } from "../components/search.component";
import { RestaurantList } from "../components/restaurant-list";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainter = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainter>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainter>
      )}
      <Search
        isFavouriteToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
