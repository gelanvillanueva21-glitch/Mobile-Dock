

class TrieNode:
    def __init__(self):
        self.children = {}
        self.endOfWord = False


class Trie:
    def __init__(self):
        self.root = TrieNode()


    def insert(self, word: str) -> None:
        cur = self.root

        for char in word:
            if char not in cur.children:
                cur.children[char] = TrieNode()
            cur = cur.children[char]
        cur.endOfWord = True


    def search(self, word: str) -> bool:
        cur = self.root

        for char in word:
            if char not in cur.children:
                return False
            cur = cur.children[char]
        return cur.endOfWord


    def startsWith(self, prefix: str) -> any:
        cur = self.root

        output = []
        for char in prefix:
            if char not in cur.children:
                return False
            output.append(cur.children)
            cur = cur.children
        return output



trie = Trie()
trie.insert("apple")
trie.insert("chanzine")
trie.insert("applied")
trie.insert("character")
trie.insert("ape")
trie.insert("ant")
trie.insert("amplifyer")

print(trie.search("chanzine"))
print(trie.startsWith("a"))
