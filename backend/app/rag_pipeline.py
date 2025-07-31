import os
import json
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_text_splitters import CharacterTextSplitter

load_dotenv()

current_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(current_dir, "../db")
persistent_directory = os.path.join(db_path, "chroma_db_rag")
json_path = os.path.join(current_dir, "..", "rappler_fax_checks.json")
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
llm = ChatOpenAI(model="gpt-4o")


def ensure_vector():
    if os.path.exists(persistent_directory):
        return Chroma(persist_directory=persistent_directory, embedding_function=embeddings)
    
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    docs = []

    for entry in data:
        content = entry.get("content", "").strip()
        if content:
            docs.append(Document(page_content = content, metadata={"source": entry.get("url"), "title": entry.get("title")}))
    

    text_splitter = CharacterTextSplitter(chunk_size = 1200, chunk_overlap = 200)
    split_docs = text_splitter.split_documents(docs)

    db = Chroma.from_documents(docs, embeddings, persist_directory=persistent_directory)
    return db


def verify_source(text: str) -> dict:
    retriever = ensure_vector().as_retriever(search_type="similarity", search_kwargs={"k": 3})
    relevant_docs = retriever.invoke(text)

    context = "\n\n".join(doc.page_content for doc in relevant_docs)
    sources = [doc.metadata.get("source", "unknown") for doc in relevant_docs]

    messages = [
        SystemMessage(content="You are a fact-checking assistant. Only answer based on the context provided. Identify if the claim is true or false, or unknown."),
        HumanMessage(content=f"Context:\n{context}\n\nQuestion: {text}")
    ]

    response = llm.invoke(messages)

    return {
        "verdict": response.content,
        "sources": sources
    }

    

