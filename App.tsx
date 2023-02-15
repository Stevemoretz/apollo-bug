import * as React from "react";
import {gql, InMemoryCache, ApolloClient} from "@apollo/client";
import {Button, View} from "react-native";

export default function App() {
    return (
        <View style={{flex: 1, justifyContent: "center"}}>
            <Button
                title={"Press"}
                onPress={async () => {
                    try {
                        const client = new ApolloClient({
                            cache: new InMemoryCache({}),
                            uri: "http://dummy.test",
                        });

                        await client
                            .subscribe({
                                query: gql(/* GraphQL */ `
                                    subscription {
                                        postUpdated {
                                            ID
                                            rooms
                                        }
                                    }
                                `),
                                errorPolicy: "all",
                                context: {
                                    uri: "http://graphql.test/central/api/graphql",
                                },
                            })
                            .subscribe((value) => {
                                console.log("subscribe", value);
                            });
                    } catch (e) {
                        console.log("error", e);
                    }
                }}
            />
        </View>
    );
}

